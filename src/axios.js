import axios from "axios";

const instance =axios.create({
    baseURL:"https://weather-app-backend-oyzxso7uz-aryangp.vercel.app"
})

export default  instance;
