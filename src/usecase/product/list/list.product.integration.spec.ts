import { Sequelize } from 'sequelize-typescript'
import ListProductUseCase from './list.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import Product from '../../../domain/product/entity/product'
import { OutputListProductDto } from './list.product.dto'

describe('Test find product use case', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should find all products', async () => {
        const productRepository =
            new ProductRepository()
        const usecase = new ListProductUseCase(
            productRepository
        )

        const output: OutputListProductDto = []
        for (let i = 1; i < 3; i++) {
            const product = new Product(
                i.toString(),
                `Product ${i}`,
                i * 10
            )
            output.push({
                id: product.id,
                name: product.name,
                price: product.price
            })
            await productRepository.create(
                product
            )
        }

        const result = await usecase.execute()

        expect(result).toEqual(output)
    })
})
