from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import problems, submissions, gemini

app = FastAPI(title="PromptArena API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(problems.router)
app.include_router(submissions.router)
app.include_router(gemini.router)


@app.get("/")
def root():
    return {"message": "Welcome to PromptArena API", "status": "running"}