// Importing database functions. DO NOT MODIFY THIS LINE.
// import { central, db1, db2, db3, vault } from "./databases.js";


async function getUserData(id) {
    // Validate the ID
    if (typeof id !== 'number' || id < 1 || id > 10) {
        return Promise.reject(new Error('Invalid ID: must be a number between 1 and 10.'));
    }

    const dbs = {
        db1: getDb1,
        db2: getDb2,
        db3: getDb3,
    };

    try {
        //  Get the database identifier from the central database
        const databaseIdentifier = await central(id);

        //  user info and personal data
        const userInfoPromise = dbs[databaseIdentifier](id);
        const personalDataPromise = vault(id);
        
        
        const [userInfo, personalData] = await Promise.all([userInfoPromise, personalDataPromise]);

        
        return {
            id,
            ...userInfo,
            ...personalData,
        };

    } catch (error) {
       
        return Promise.reject(new Error(`Error fetching user data: ${error.message}`));
    }
}

// Setting timeout for the databases
const getDb1 = (id) => new Promise(resolve => {
    setTimeout(() => resolve({  }), Math.random() , 100);
});
const getDb2 = (id) => new Promise(resolve => {
    setTimeout(() => resolve({ }), Math.random() ,150);
});
const getDb3 = (id) => new Promise(resolve => {
    setTimeout(() => resolve({ address: {  } }), Math.random() , 300);
});

//  vault function
const vault = (id) => new Promise(resolve => {
    setTimeout(() => resolve({ }), Math.random() ,200);
});

// central function
const central = (id) => new Promise(resolve => {
    setTimeout(() => resolve('db1'), 100); 
});

// Testing the data
async function testFetchUserData() {
    const testIds = [1, -1, 10, 0, 18, 'a', true];

    for (const id of testIds) {
        try {
            const userData = await getUserData(id);
            console.log(`User Data for ID ${id}:`, userData);
        } catch (error) {
            console.error(`Error for ID ${id}: ${error.message}`);
        }
    }
}

testFetchUserData();
