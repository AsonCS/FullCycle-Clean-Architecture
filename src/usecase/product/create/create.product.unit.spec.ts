import {
    InputCreateProductDto,
    OutputCreateProductDto
} from './create.product.dto'
import CreateProductUseCase from './create.product.usecase'

const input: InputCreateProductDto = {
    name: 'Chair',
    price: 100
}

describe('Unit test create product use case', () => {
    it('should create a product', async () => {
        const productCreateUseCase =
            new CreateProductUseCase({
                find: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                findAll: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                create: (inputDto) => {
                    expect(
                        inputDto.id
                    ).toStrictEqual(
                        expect.any(String)
                    )
                    expect(inputDto.name).toBe(
                        input.name
                    )
                    expect(inputDto.price).toBe(
                        input.price
                    )
                    return Promise.resolve()
                },
                update: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                }
            })

        const output: OutputCreateProductDto =
            await productCreateUseCase.execute(
                input
            )

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it('should thrown an error when name is missing', async () => {
        const productCreateUseCase =
            new CreateProductUseCase({
                find: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                findAll: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                create: (inputDto) => {
                    expect(inputDto.name).toBe(
                        expect.any(String)
                    )
                    expect(inputDto.name).toBe(
                        input.name
                    )
                    expect(inputDto.price).toBe(
                        input.price
                    )
                    return Promise.resolve()
                },
                update: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                }
            })

        expect(
            productCreateUseCase.execute({
                ...input,
                name: ''
            })
        ).rejects.toThrow('Name is required')
    })

    it('should thrown an error when price is zero or less', async () => {
        const productCreateUseCase =
            new CreateProductUseCase({
                find: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                findAll: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                create: (inputDto) => {
                    expect(inputDto.name).toBe(
                        expect.any(String)
                    )
                    expect(inputDto.name).toBe(
                        input.name
                    )
                    expect(inputDto.price).toBe(
                        input.price
                    )
                    return Promise.resolve()
                },
                update: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                }
            })

        expect(
            productCreateUseCase.execute({
                ...input,
                price: -1
            })
        ).rejects.toThrow(
            'Price must be greater zero or greater'
        )
    })
})
