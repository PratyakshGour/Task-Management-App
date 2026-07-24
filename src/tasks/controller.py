from src.tasks.dtos import TaskSchema
from sqlalchemy.orm import Session
from src.tasks.models import TaskModel

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