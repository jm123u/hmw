import { DB } from "https://deno.land/x/sqlite/mod.ts";

try {
    Deno.remove("mydb.db")
} catch (e) {
    console.log('remove fail!')
}
const db = new DB("mydb.db");