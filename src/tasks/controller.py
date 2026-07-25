from src.tasks.dtos import TaskSchema
from sqlalchemy.orm import Session
from src.tasks.models import TaskModel
from fastapi import HTTPException

def create_task(body: TaskSchema, db:Session):
    data = body.model_dump()
    new_task = TaskModel(title = data["title"],
                         discription = data["discription"],
                         is_completed = data["is_completed"]
                         )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)



    return {"status": "Task Created Succesfully...", "data":new_task}

def get_task(db:Session):
    tasks = db.query(TaskModel).all()
    return {"status": "All tasks", "data":tasks}


def get_one_task(task_id:int, db:Session):
    one_task = db.query(TaskModel).get(task_id)
    if not one_task:
        return HTTPException(404, detail="Task Id  is Incorrect")
    
    return {"status":"Task Fetched Succesfully", "data":one_task}