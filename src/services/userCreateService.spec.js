const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError")


describe("UserCreateService", () => {
    let userRepositoryInMemory = null
    let userCreateService = null

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })

    it("user should be create", async () => {
        const user = {
            name: "User test",
            email: "user@test.com",
            password: "123456"
        }

        const userCreated = await userCreateService.execute(user)

        expect(userCreated).toHaveProperty("id")

    });

    it("user not should be created with exists email", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123456"
        }

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "123456"
        }

        await userCreateService.execute(user1)
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError('Esse email já esta registrado, tente com algum outro!'))
    })

})