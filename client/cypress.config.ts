import { defineConfig } from 'cypress'
import axios from "axios";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        async 'db:erase'() {
          await axios.delete("http://localhost:3001/users");
          return null; 
        },
      })
    },
  },
});
