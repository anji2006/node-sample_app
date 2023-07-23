import express from "express";
import { readFileSync, writeFileSync } from "fs";
import { parse } from "path";
const app = express();
const port = 2006;
const dataPath = "./content.txt";

app.use(express.json());

app.listen(port, () => {
  console.log(`this app is listening at ${port}`);
});

app.get("/list", (req, res) => {
  try {
    const data = JSON.parse(readFileSync(dataPath, "utf8"));

    res.json({ data: data });
  } catch (err) {
    console.log("Error occur while reading file");
  }
});

app.post("/", (req, res) => {
  try {
    const data = JSON.parse(readFileSync(dataPath, "utf8"));
    const newObj = req.body.data;
    newObj.id = data.length;

    // console.log("#### this is req", newObj);

    data.push(newObj);

    writeFileSync(dataPath, JSON.stringify(data), "utf8");

    res.json({ msg: "Succfully Created item" });
  } catch (err) {
    console.log("Error occur while reading file", err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/", (req, res) => {
  try {
    const data = JSON.parse(readFileSync(dataPath, "utf8"));
    const updateObj = req.body.data;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === updateObj.id) {
        data[i] = updateObj;
        break;
      }
    }

    // console.log("#### this is req", req.body);

    writeFileSync(dataPath, JSON.stringify(data), "utf8");

    res.json({ msg: "Succfully Updated item" });
  } catch (err) {
    console.log("Error occur while reading file", err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/", (req, res) => {
  try {
    const item_id = req.body.id;
    const data = JSON.parse(readFileSync(dataPath, "utf8"));
    const updateData = data.filter((eachItem) => eachItem.id !== item_id);

    writeFileSync(dataPath, JSON.stringify(updateData), "utf8");
    res.json({ msg: "Succfully Deleted item" });
  } catch (err) {
    console.log("Error occur while reading file", err);
    res.status(500).send("Internal Server Error");
  }
});
