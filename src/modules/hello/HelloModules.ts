import { HelloApiRepository } from "@/repository/helloRepository";
import { HelloUseCase } from "@/usecase/helloUseCase";

export class HelloModules {
    private repository: HelloApiRepository;
    public useCase: HelloUseCase;

    constructor(dispatch?: (action: any) => void) {
        this.repository = new HelloApiRepository();
        this.useCase = new HelloUseCase(this.repository, dispatch);
    }
}