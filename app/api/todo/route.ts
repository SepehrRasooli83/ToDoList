import { NextResponse } from "next/server";
import {connectToDatabase} from '../../db/connect'
import TodoModel from "@/app/db/models/Todo";
import { error } from "console";


connectToDatabase();

//GetList
export async function GET(){
    try{
        const todos =await TodoModel.find({});
        return NextResponse.json(todos);
    }
    catch(err){
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}

//Post,Create
export async function POST(req:Request){
    try{
        const newTodo = new TodoModel(await req.json());
        await newTodo.save();
        return NextResponse.json(newTodo, {status:201});
    }catch(err){
        return NextResponse.json(`Failed create todo : ${err}`,{status:500});
    }
}


//PUT,Edit
export async function PUT(req:Request){
    try{
        const body = await req.json();
        const {id,...updates} = body;
        const editingTodo = await TodoModel.findByIdAndUpdate(id,updates,{new:true});
        if(!editingTodo){
            return NextResponse.json({error:"todo not found"},{status:404});
        }
        return NextResponse.json(editingTodo);
    }catch(err){
        return NextResponse.json({error: err},{status:500});
    }
}


// DELETE: Delete a todo
export async function DELETE(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
      }
      const deletedTodo = await TodoModel.findByIdAndDelete(id);
      if (!deletedTodo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }
  }