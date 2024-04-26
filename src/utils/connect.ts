import mongoose from 'mongoose';
export const connect = async () => {
    try {
    
    const MONGO_URI = 'mongodb+srv://benn1234:benn1234@benncluster.btncfea.mongodb.net/rest-api-typescript?retryWrites=true&w=majority';

    mongoose.connect(MONGO_URI, () => console.log('Connected to DataBase'));
    // {
    //     if(err) {
    //         console.log(err)
    //     } else {
            
    //     }
    // };
   }   catch (err){
        console.log('Could not connect to DataBase ' + err);
        process.exit(1)
    }
}

