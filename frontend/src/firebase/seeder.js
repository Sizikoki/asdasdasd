import { db } from './config';
import { collection, writeBatch, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAllTerms } from '@/data/medicalTerms';

/**
 * Seeds medical terms from the local JavaScript file into Firestore.
 * Automatically transforms the structure before uploading:
 * - 'turkish' field is renamed to 'english'
 * - 'definition' field is renamed to 'turkishDefinition'
 * 
 * Implements a safe, one-time execution guard using a hybrid localStorage and Firestore document check.
 */
export const seedMedicalTerms = async () => {
  // Prevent execution in production bundle to avoid permission errors and unnecessary writes
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  // 1. Check local storage first to prevent redundant Firestore reads
  if (localStorage.getItem('medical_terms_seeded') === 'true') {
    return;
  }

  try {
    // 2. Query Firestore metadata to ensure another device or browser hasn't already seeded the DB
    const seedingDocRef = doc(db, 'metadata', 'seeding');
    const docSnap = await getDoc(seedingDocRef);

    if (docSnap.exists() && docSnap.data().termsSeeded === true) {
      localStorage.setItem('medical_terms_seeded', 'true');
      console.log('Database already seeded (verified by Firestore).');
      return;
    }

    console.log('Starting medical terms seeding to Firestore...');

    const terms = getAllTerms();
    const batchSize = 400; // Firestore limit is 500 writes per batch

    for (let i = 0; i < terms.length; i += batchSize) {
      const batch = writeBatch(db);
      const chunk = terms.slice(i, i + batchSize);

      chunk.forEach((item) => {
        // Correcting the structure:
        // - turkish -> english
        // - definition -> turkishDefinition
        const cleanedItem = {
          id: item.id,
          term: item.term,
          english: item.turkish, // Map the english word here
          roots: item.roots || '',
          turkishDefinition: item.definition, // Map the turkish definition here
          category: item.category || '',
          system: item.system || '',
          subcategory: item.subcategory || ''
        };

        // Use the term's unique ID as the document ID in Firestore to prevent duplicates
        const docRef = doc(db, 'terms', String(item.id));
        batch.set(docRef, cleanedItem);
      });

      await batch.commit();
      console.log(`Committed batch of ${chunk.length} terms.`);
    }

    // 3. Mark as successfully seeded in both Firestore and localStorage
    await setDoc(seedingDocRef, {
      termsSeeded: true,
      seededAt: new Date().toISOString()
    });
    localStorage.setItem('medical_terms_seeded', 'true');
    console.log('Medical terms seeding completed successfully!');
  } catch (error) {
    console.error('Failed to seed medical terms to Firestore:', error);
  }
};
