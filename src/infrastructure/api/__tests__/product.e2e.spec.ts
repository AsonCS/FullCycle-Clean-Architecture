import ProductInterface from '../../../domain/product/entity/product.interface'
import { OutputFindProductDto } from '../../../usecase/product/find/find.product.dto'
import { OutputListProductDto } from '../../../usecase/product/list/list.product.dto'
import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: 'Chair',
                price: 100
            })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Chair')
        expect(response.body.price).toBe(100)
    })

    it('should not create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: '',
                price: -1
            })
        expect(response.status).toBe(500)
        expect(response.body.error).toBe(
            'product: Name is required,product: Price must be greater zero or greater'
        )
    })

    it('should find a product', async () => {
        await request(app).post('/product').send({
            name: 'Chair',
            price: 100
        })
        const listResponse: OutputListProductDto =
            await request(app)
                .get('/product')
                .send()
                .then((response) => response.body)

        const productResponse = await request(app)
            .get(`/product/${listResponse[0].id}`)
            .send()
        const product: OutputFindProductDto =
            productResponse.body

        expect(productResponse.status).toBe(200)
        expect(product.name).toBe('Chair')
        expect(product.price).toBe(100)

        const productResponseXML = await request(
            app
        )
            .get(`/product/${listResponse[0].id}`)
            .set('Accept', 'application/xml')
            .send()

        expect(productResponseXML.status).toBe(
            200
        )
        expect(productResponseXML.text).toContain(
            `<?xml version="1.0" encoding="UTF-8"?>`
        )
        expect(productResponseXML.text).toContain(
            `<product>`
        )
        expect(productResponseXML.text).toContain(
            `<id>${listResponse[0].id}</id>`
        )
        expect(productResponseXML.text).toContain(
            `<name>Chair</name>`
        )
        expect(productResponseXML.text).toContain(
            `<price>100</price>`
        )
        expect(productResponseXML.text).toContain(
            `</product>`
        )
    })

    it('should list all product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: 'Chair',
                price: 100
            })
        expect(response.status).toBe(200)

        const response2 = await request(app)
            .post('/product')
            .send({
                name: 'Table',
                price: 250
            })
        expect(response2.status).toBe(200)

        const listResponse = await request(app)
            .get('/product')
            .send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.length).toBe(2)

        const product = listResponse.body[0]
        expect(product.name).toBe('Chair')
        expect(product.price).toBe(100)

        const product2 = listResponse.body[1]
        expect(product2.name).toBe('Table')
        expect(product2.price).toBe(250)

        const listResponseXML = await request(app)
            .get('/product')
            .set('Accept', 'application/xml')
            .send()

        expect(listResponseXML.status).toBe(200)
        expect(listResponseXML.text).toContain(
            `<?xml version="1.0" encoding="UTF-8"?>`
        )
        expect(listResponseXML.text).toContain(
            `<products>`
        )
        expect(listResponseXML.text).toContain(
            `<product>`
        )
        expect(listResponseXML.text).toContain(
            `<id>`
        )
        expect(listResponseXML.text).toContain(
            `</id>`
        )
        expect(listResponseXML.text).toContain(
            `<name>Chair</name>`
        )
        expect(listResponseXML.text).toContain(
            `<price>100</price>`
        )
        expect(listResponseXML.text).toContain(
            `<name>Table</name>`
        )
        expect(listResponseXML.text).toContain(
            `<price>250</price>`
        )
        expect(listResponseXML.text).toContain(
            `</product>`
        )
        expect(listResponseXML.text).toContain(
            `</products>`
        )
    })

    it('should update a product', async () => {
        await request(app).post('/product').send({
            name: 'Chair',
            price: 100
        })
        const listResponse: OutputListProductDto =
            await request(app)
                .get('/product')
                .send()
                .then((response) => response.body)

        await request(app)
            .put(`/product/${listResponse[0].id}`)
            .send({
                name: 'Updated',
                price: 555
            })

        const productResponse = await request(app)
            .get(`/product/${listResponse[0].id}`)
            .send()
        const product: OutputFindProductDto =
            productResponse.body

        expect(productResponse.status).toBe(200)
        expect(product.name).toBe('Updated')
        expect(product.price).toBe(555)

        const productResponseXML = await request(
            app
        )
            .get(`/product/${listResponse[0].id}`)
            .set('Accept', 'application/xml')
            .send()

        expect(productResponseXML.status).toBe(
            200
        )
        expect(productResponseXML.text).toContain(
            `<?xml version="1.0" encoding="UTF-8"?>`
        )
        expect(productResponseXML.text).toContain(
            `<product>`
        )
        expect(productResponseXML.text).toContain(
            `<id>${listResponse[0].id}</id>`
        )
        expect(productResponseXML.text).toContain(
            `<name>Updated</name>`
        )
        expect(productResponseXML.text).toContain(
            `<price>555</price>`
        )
        expect(productResponseXML.text).toContain(
            `</product>`
        )
    })
})
