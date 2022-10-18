const NoteCreateService = require("./NoteCreateService")
const NoteRepository = require("../repositories/NoteRepositoryInMemory")

describe("NoteCreateService", () => {
    let noteCreateService = null
    let noteRepository = null

    beforeEach(()=> {
        noteRepository = new NoteRepository();
        noteCreateService = new NoteCreateService(noteRepository);
    })
    
    it("note should be create", async () => {
        const note = {
            title: "Detetive",
	        description: "Após ser traída por Bill e seu antigo grupo, a Noiva assassina fica à beira da morte por 4 anos. Após despertar do coma, ela vai atrás de cada um dos seus antigos companheiros para matá-los. Na segunda parte dessa busca por vingança, a noiva vai continuar sua procura por Bill, atacando os últimos dois sobreviventes do grupo: Budd e Elle Driver . O confronto com seu antigo mestre, e mandante da sua morte, vai revelar novas surpresas para a assassina.",
	        rating: 5,
	        user_id: 1,
	        tags: [
		        "teste",
		        "teste2"
	        ]
        }

        const noteCreated = await noteCreateService.execute(note)

        expect(noteCreated).toHaveProperty("id")
    })


})
