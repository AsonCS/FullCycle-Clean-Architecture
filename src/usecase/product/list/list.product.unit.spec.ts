import Product from '../../../domain/product/entity/product'
import ListProductUseCase from './list.product.usecase'

const product1 = new Product(
    'p1',
    'Product 1',
    10
)
const product2 = new Product(
    'p2',
    'Product 2',
    20
)

describe('Unit test for listing product use case', () => {
    it('should list a product', async () => {
        const useCase = new ListProductUseCase({
            create: () => {
                throw new Error(
                    'Method not implemented.'
                )
            },
            find: () => {
                throw new Error(
                    'Method not implemented.'
                )
            },
            findAll: async () => [
                product1,
                product2
            ],
            update: () => {
                throw new Error(
                    'Method not implemented.'
                )
            }
        })

        const output = await useCase.execute()

        expect(output.length).toBe(2)
        expect(output[0].id).toBe(product1.id)
        expect(output[0].name).toBe(product1.name)
        expect(output[0].price).toBe(
            product1.price
        )
        expect(output[1].id).toBe(product2.id)
        expect(output[1].name).toBe(product2.name)
        expect(output[1].price).toBe(
            product2.price
        )
    })
})
