import  express, {Request, Response} from 'express';

const app = express();

app.get("/", async(req: Request, res: Response)=>{
    res.status(200).json({
        message: "Wellcome to tour management App",
    })
})

export default app;