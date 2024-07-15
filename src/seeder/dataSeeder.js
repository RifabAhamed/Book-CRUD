import { mongoose } from "mongoose";
import Color from "../model/Color.js";
import { colorList } from "./seedingData.js";

async function dataSeeder() {
   try {
      const models = [
         { model: Color, dataList: colorList },
      ];

      for (const { model, dataList } of models) {
         const count = await model.countDocuments();
         if (count === 0) {
            console.log(
               `${model.modelName} model doesn't have existing data.So, Seeding data...`
            );
            await model.insertMany(dataList);
            console.log(`${model.modelName} data seeded successfully`);
         }
      }
   } catch (error) {
      console.error("Error seeding data:", error);
   }
}

export default dataSeeder;
