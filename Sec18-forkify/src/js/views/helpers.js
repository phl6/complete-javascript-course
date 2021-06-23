import { TIMEOUT_SEC } from '../config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};


//287 Helpers and Configuration Files
export const getJSON = async function(url){
    //Step 1: Loading Recipe (Sec282)
    try {
        // const res = await fetch(url);
        //throw error if it loads too long
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
      
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        return data;
    } catch (error) {
        console.error(error);
    }
}