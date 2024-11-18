import mongoose from "mongoose";

interface ITodo {
    number:number;
    description:string;
}

const TodoSchema = new mongoose.Schema<ITodo>(
    {
        number:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }    
);

const TodoModel = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default TodoModel;