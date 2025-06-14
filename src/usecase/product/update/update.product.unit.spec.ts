import Product from '../../../domain/product/entity/product'
import {
    InputUpdateProductDto,
    OutputUpdateProductDto
} from './update.product.dto'
import UpdateProductUseCase from './update.product.usecase'

describe('Unit test for product update use case', () => {
    it('should update a product', async () => {
        const productUpdateUseCase =
            new UpdateProductUseCase({
                find: (input) => {
                    expect(input).toBe('123')
                    return Promise.resolve(
                        new Product(
                            '123',
                            'Old',
                            1
                        )
                    )
                },
                findAll: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                create: () => {
                    throw new Error(
                        'Method not implemented.'
                    )
                },
                update: (input) => {
                    expect(input.id).toBe('123')
                    expect(input.name).toBe(
                        'Chair'
                    )
                    expect(input.price).toBe(100)
                    return Promise.resolve()
                }
            })

        const input: InputUpdateProductDto = {
            id: '123',
            name: 'Chair',
            price: 100
        }
        const output: OutputUpdateProductDto = {
            id: input.id,
            name: input.name,
            price: input.price
        }

        const result =
            await productUpdateUseCase.execute(
                input
            )

        expect(result).toEqual(output)
    })
})
