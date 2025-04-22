import { Client, Databases, ID } from "appwrite";
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const databases = new Databases(client);

export {ID, databases}
