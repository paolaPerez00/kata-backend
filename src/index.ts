import app from "./app";
import { AppDataSource } from "./database/conection";

const PORT = process.env.PORT || 6500;


async function main(){
    try {
        await AppDataSource.initialize();
        console.log("Database connected")
        app.listen(PORT, () => {
            console.log(`Server activo en puerto ${PORT}`);
        });
    } catch (error) {
        if( error instanceof Error){
            console.log("error ",error.message)
        }
    }
   
}

main();
