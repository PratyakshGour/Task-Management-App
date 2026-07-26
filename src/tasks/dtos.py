from pydantic import BaseModel

class TaskSchema(BaseModel):
    title:str
    discription:str
    is_completed:bool = False



class TaskResponseSchema(BaseModel):
    id:int
    title:str
    discription:str
    is_completed:bool 