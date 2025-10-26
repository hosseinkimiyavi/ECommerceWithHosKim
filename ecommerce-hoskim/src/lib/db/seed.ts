import { cwd } from "process";
import { loadEnvConfig } from "@next/env";
import data from "../data";
import Product from "./models/product.model";
import { connectToDatabase } from ".";



loadEnvConfig(cwd())  // load .env file

const main = async () => {
    try {
        const {products} = data
        await connectToDatabase(process.env.MongoDB_URI)
         await Product.deleteMany()

         const createdProducts = await Product.insertMany(products)
         console.log({
            createdProducts,
            message: 'seeded database successfully',
         })
            process.exit(0)
    } catch (error) {
        console.error(error)
        throw new Error('failed to seed database')
        
    }
}

main()