import prisma from "../../../lib/prismaHelper";

export async function GET(req: Request, res: Response) {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        completed: true,
        createdAt: true,
      },
    });
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    if (!body.title) {
      return new Response(
        JSON.stringify({
          message: "Title must be filled",
        }),
        {
          status: 400, // Change status to 400 for bad request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const task = await prisma.task.create({
      data: {
        title: body.title,
        completed: false, // Set completed to false by default
      },
    });

    return new Response(JSON.stringify(task), {
      status: 200, // Change status to 201 for resource created
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { id, completed } = body;

    if (id === undefined || completed === undefined) {
      return new Response(
        JSON.stringify({
          message: "ID and completed must be provided",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    });

    return new Response(JSON.stringify(updatedTask), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const body = await req.json();
    const task = await prisma.task.delete({
      where: { id: body.id },
    });

    return new Response(
      JSON.stringify({
        message: "Task removed: " + body.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
