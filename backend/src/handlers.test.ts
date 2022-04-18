import { TaskStatus } from "./types";
import { ListTasksHandler, UpdateTaskHandler } from "./handlers";
import { TaskService, UserService } from "./services";
import { ErrorMessages } from "./constants";

describe("ListTasksHandlerTests", () => {
  test("When keyword is not given expect all tasks", () => {
    const mockTaskService = new TaskService();
    const mockUserService = new UserService(mockTaskService);
    const handler = new ListTasksHandler(mockTaskService, mockUserService);
    mockUserService.currentUser = { uuid: "test", name: "test-name" };
    mockTaskService.list = jest
      .fn()
      .mockImplementation((uuid: string) => [
        { title: "task-name-1" },
        { title: "task-name-2" },
      ]);

    const tasks = handler.handle({});

    expect(tasks.length).toBe(2);
  });

  test("When keyword is test-name-2 expect all tasks", () => {
    const mockTaskService = new TaskService();
    const mockUserService = new UserService(mockTaskService);
    const handler = new ListTasksHandler(mockTaskService, mockUserService);
    mockUserService.currentUser = { uuid: "test", name: "test-name" };
    mockTaskService.list = jest
      .fn()
      .mockImplementation((uuid: string) => [
        { title: "task-name-1" },
        { title: "task-name-2" },
      ]);

    const tasks = handler.handle({ searchKeyWord: "task-name-2" });

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe("task-name-2");
  });
});

describe("UpdateTaskHandlerTests", () => {
  test("When uuid is invalid expect invalid input error thrown", () => {
    const mockTaskService = new TaskService();
    const mockUserService = new UserService(mockTaskService);
    const handler = new UpdateTaskHandler(mockTaskService, mockUserService);
    mockUserService.currentUser = { uuid: "test", name: "test-name" };
    mockTaskService.update = jest.fn();

    expect(() => {
      handler.handle({});
    }).toThrow(ErrorMessages.InvalidInput);
    expect(mockTaskService.update).not.toHaveBeenCalled();
  });

  test("When status is invalid expect invalid input error thrown", () => {
    const mockTaskService = new TaskService();
    const mockUserService = new UserService(mockTaskService);
    const handler = new UpdateTaskHandler(mockTaskService, mockUserService);
    mockUserService.currentUser = { uuid: "test", name: "test-name" };
    mockTaskService.update = jest.fn();

    expect(() => {
      // @ts-ignore
      handler.handle({ uuid: "test", status: "does-not-exist" });
    }).toThrow(ErrorMessages.InvalidInput);
    expect(mockTaskService.update).not.toHaveBeenCalled();
  });

  test("When only title is provided expect only called with title", () => {
    const mockTaskService = new TaskService();
    const mockUserService = new UserService(mockTaskService);
    const handler = new UpdateTaskHandler(mockTaskService, mockUserService);
    mockTaskService._tasks = {
      test: { test: { uuid: "test", title: "foo", status: TaskStatus.Done } },
    };
    mockUserService.currentUser = { uuid: "test", name: "test-name" };
    mockTaskService.update = jest.fn();

    handler.handle({ uuid: "test", title: "test" });
    expect(mockTaskService.update).toHaveBeenCalled();
  });
});
