// JSON File Manipulation

const fs = require("fs");

// File Paths
const jsonFilePath = "university.json";
const backupFilePath = "university_backup.json";

// Nested JSON Structure
const universityData = {
  university: "SRM University",
  departments: [
    {
      name: "Computer Science",
      professors: [
        { id: 1, name: "Dr. Smith" },
        { id: 2, name: "Dr. Brown" },
      ],
      students: [
        { id: 101, name: "Alice" },
        { id: 102, name: "Bob" },
      ],
    },
  ],
};

// Save Data to JSON File
if (!fs.existsSync(jsonFilePath)) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(universityData, null, 2));
}

// Backup Function
function createBackup() {
  if (fs.existsSync(jsonFilePath)) {
    fs.copyFileSync(jsonFilePath, backupFilePath);
  }
}

// Read JSON File
function readJSON() {
  try {
    const data = fs.readFileSync(jsonFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.log("Could not read file", err);
    return null;
  }
}

// Write JSON File
function writeJSON(data) {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("Could not write file", err);
  }
}

// Add Entry
function addEntry(data, deptName, type, entry) {
  const department = data.departments.find((d) => d.name === deptName);
  if (department) {
    department[type].push(entry);
  } else {
    console.log("Department not found");
  }
}

// Update Entry
function updateEntry(data, deptName, type, id, updatedEntry) {
  const department = data.departments.find((d) => d.name === deptName);
  if (department) {
    const item = department[type].find((i) => i.id === id);
    if (item) {
      Object.assign(item, updatedEntry);
    } else {
      console.log("Item not found");
    }
  } else {
    console.log("Department not found");
  }
}

// Delete Entry
function deleteEntry(data, deptName, type, id) {
  const department = data.departments.find((d) => d.name === deptName);
  if (department) {
    department[type] = department[type].filter((i) => i.id !== id);
  } else {
    console.log("Department not found");
  }
}

// Example Usage
createBackup();
let data = readJSON();
if (data) {
  addEntry(data, "Computer Science", "students", { id: 103, name: "Charlie" });
  updateEntry(data, "Computer Science", "students", 101, { name: "Alicia" });
  deleteEntry(data, "Computer Science", "students", 102);
  writeJSON(data);
}
