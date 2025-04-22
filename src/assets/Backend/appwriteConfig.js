import { Client, Databases, ID } from "appwrite";
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endPoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const client = new Client()
    .setEndpoint(endPoint)
    .setProject(projectId);

const databases = new Databases(client);

export {ID, databases}
