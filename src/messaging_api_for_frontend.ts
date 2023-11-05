import express, { Request, Response } from "express";
import { getMissingItems, getExpiredItems, getShelfOptions } from "./algorithms_requests"; 
import { addUser } from "./prisma-queries/user";
import { addItem, removeItem } from "./prisma-queries/item";
import { addRequiredItem } from "./prisma-queries/requiredItem";
import { getItems ,getShelves } from "./prisma-queries/fridge";
import { Item, NewItem, Shelf, User, NewUser, NewRequiredItem, RequiredItem } from "./interfaces";
import axios, { AxiosError } from "axios";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const Router = express.Router();

/**
 * Controller Definitions
 */
Router.post("/addUser/:fridgeId/:userName/:email", async (req, res) => {
    try {

        const newUser: NewUser = {
            name: req.params.userName,
            email: req.params.email,
            fridgeId: parseInt(req.params.fridgeId, 10)
        };
        const userData: User | AxiosError = await addUser(newUser);    

        console.log("User with name:", userData.name, "added to fridge with ID:", userData.fridgeId);
  
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

Router.post("/addRequiredItem/:fridgeId/:itemName", async (req, res) => {
    try {
        const fridgeId: number = parseInt(req.params.fridgeId, 10);
        const itemName = req.params.itemName;
        
        // TODO - check that item is a valid item
    
        const newRequiredItem: NewRequiredItem = {
            name: req.params.itemName,
            fridgeId: parseInt(req.params.fridgeId, 10)
        };
        const itemData: RequiredItem | AxiosError = await addRequiredItem(newRequiredItem);    


        console.log("Added required item with name", itemName, "from fridge with ID:", fridgeId);
  
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


Router.get("/getShelfOptions/:fridgeId", async (req, res) => {
    try {
        const fridgeId: number = parseInt(req.params.fridgeId, 10);

        const shelfOptions: Shelf[] | AxiosError = await getShelfOptions(fridgeId);

        // Send a response based on the result from the algorithms API
        if (shelfOptions) {
            res.status(200).json({ message: "Available Shelves: ", shelfOptions });
        } else {
            res.status(200).json({ message: "No Available Shelves" });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});



Router.get("/getItemsInFridge/:fridgeId", async (req, res) => {
    try {

        const fridgeId: number = parseInt(req.params.fridgeId, 10);

        const items = await getItems(fridgeId);    


        // Send a response based on the result from the algorithms API
        if (items) {
            res.status(200).json({ message: "Available Shelves: ", items });
        } else {
            res.status(200).json({ message: "No items in the fridge" });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

Router.get("/getShelves/:fridgeId", async (req, res) => {
    try {

        const fridgeId: number = parseInt(req.params.fridgeId, 10);

        const shelves = await getShelves(fridgeId);    


        // Send a response based on the result from the algorithms API
        if (shelves) {
            res.status(200).json({ message: "Shelves in fridge: ", shelves });
        } else {
            res.status(200).json({ message: "No shelves in the fridge" });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});


Router.post("/addItem/:fridgeId/:itemName/:length/:width/:height/:expiry/:shelfId", async (req, res) => {
    try {       
        // TODO - check that item is a valid item
        const newItem: NewItem = {
            name: req.params.itemName,
            length: parseInt(req.params.length,10),
            width: parseInt(req.params.width,10),
            height: parseInt(req.params.height,10),
            expiry: new Date(req.params.expiry),
            shelfId: parseInt(req.params.shelfId, 10),
            fridgeId: parseInt(req.params.fridgeId, 10),
        };
        const itemData: Item | AxiosError = await addItem(newItem);    
    

        console.log("Added item with name:", itemData.name,"from fridge with ID:", itemData.id);
  
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

Router.delete("/removeItem/:fridgeId/:itemID", async (req: Request, res: Response) => {
    try {
      const itemID: number = parseInt(req.params.itemID, 10);
      const fridgeId: number = parseInt(req.params.fridgeId, 10);
      
      const itemData: Item | AxiosError = await removeItem(itemID);

      console.log("Deleted item with ID:", itemID, " from fridge with ID:", fridgeId);
  
      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
});


Router.get("/checkExpiredItems/:fridgeId", async (req, res) => {
    try {
        const fridgeId: number = parseInt(req.params.fridgeId, 10);

        const expiredItems: Item[] | AxiosError = await getExpiredItems(fridgeId);

        // Send a response based on the result from the database API
        if (expiredItems) {
            res.status(200).json({ message: "Some items are expired", expiredItems });
        } else {
            res.status(200).json({ message: "No expired items" });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

Router.get("/checkMissingItems/:fridgeId", async (req, res) => {
    try {
        const fridgeId: number = parseInt(req.params.fridgeId, 10);

        const missingItems: Item[] | AxiosError = await getMissingItems(fridgeId);

        // Send a response based on the result from the database API
        if (missingItems) {
            res.status(200).json({ message: "Some items are missing.", missingItems });
        } else {
            res.status(200).json({ message: "All items are accounted for." });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});


Router.post('/addDefaultFridge', async (req, res) => {
  try {
    const defaultFridge = await prisma.fridge.upsert({
      where: { name: 'Samsung2000'  },
      update: {},
      create: {
        name: 'Samsung2000',
        users: {},
        shelves: {
          create: [
            {
              shelfIndex: 1,
              length: 10,
              width: 30,
              height: 5,
              items: {}
            },
            {
              shelfIndex: 2,
              length: 10,
              width: 30,
              height: 5,
              items: {}
            },
            {
              shelfIndex: 3,
              length: 10,
              width: 30,
              height: 5,
              items: {}
            }
          ]
        }
      }
    });
    const response = {
        message: 'Fridge Added to Database with ID: ' + defaultFridge.id
      };
    console.log({ defaultFridge });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


