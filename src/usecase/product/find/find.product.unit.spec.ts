import Product from '../../../domain/product/entity/product'
import {
    InputFindProductDto,
    OutputFindProductDto
} from './find.product.dto'
import FindProductUseCase from './find.product.usecase'

describe('Unit Test find product use case', () => {
    it('should find a product', async () => {
        const product = new Product(
            '123',
            'Chair',
            100
        )
        const usecase = new FindProductUseCase({
            find: (input) => {
                expect(input).toBe(product.id)
                return Promise.resolve(product)
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
            update: () => {
                throw new Error(
                    'Method not implemented.'
                )
            }
        })

        const input: InputFindProductDto = {
            id: '123'
        }
        const output: OutputFindProductDto = {
            id: '123',
            name: 'Chair',
            price: 100
        }

        const result = await usecase.execute(
            input
        )

        expect(result).toEqual(output)
    })

    it('should not find a product', async () => {
        const usecase = new FindProductUseCase({
            find: () => {
                throw new Error(
                    'Product not found'
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
            update: () => {
                throw new Error(
                    'Method not implemented.'
                )
            }
        })

        const input = {
            id: '123'
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow('Product not found')
    })
})
