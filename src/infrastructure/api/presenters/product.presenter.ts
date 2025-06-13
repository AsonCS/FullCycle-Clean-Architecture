import { toXML } from 'jstoxml'
import {
    OutputListProductDto,
    OutputProductDto
} from '../../../usecase/product/list/list.product.dto'

export default class ProductPresenter {
    static xml(
        product: OutputProductDto
    ): string {
        const xmlOption = {
            header: true,
            indent: '  ',
            newline: '\n',
            allowEmpty: true
        }

        return toXML(
            {
                product: () => ({
                    id: product.id,
                    name: product.name,
                    price: product.price
                })
            },
            xmlOption
        )
    }
    static listXML(
        products: OutputListProductDto
    ): string {
        const xmlOption = {
            header: true,
            indent: '  ',
            newline: '\n',
            allowEmpty: true
        }

        return toXML(
            {
                products: () =>
                    products.map((product) => ({
                        product: {
                            id: product.id,
                            name: product.name,
                            price: product.price
                        }
                    }))
            },
            xmlOption
        )
    }
}
