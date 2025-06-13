# Full Cycle - Clean Architecture (Full Cycle 3.0 Course)

<div align="center">
    <img src="https://img.shields.io/badge/Typescript-404D59?style=for-the-badge&logo=typescript&logoColor=%2361DAFB" />
</div>

## UseCases Challenge

-   [CreateProductUseCase](/src/usecase/product/create/create.product.usecase.ts)
    -   [CreateProductUseCase Integration Spec](/src/usecase/product/create/create.product.integration.spec.ts)
    -   [CreateProductUseCase Unit Spec](/src/usecase/product/create/create.product.unit.spec.ts)
-   [FindProductUseCase](/src/usecase/product/find/find.product.usecase.ts)
    -   [FindProductUseCase Integration Spec](/src/usecase/product/find/find.product.integration.spec.ts)
    -   [FindProductUseCase Unit Spec](/src/usecase/product/find/find.product.unit.spec.ts)
-   [ListProductUseCase](/src/usecase/product/list/list.product.usecase.ts)
    -   [CreateProductUseCase Integration Spec](/src/usecase/product/list/list.product.integration.spec.ts)
    -   [CreateProductUseCase Unit Spec](/src/usecase/product/list/list.product.unit.spec.ts)
-   [UpdateProductUseCase](/src/usecase/product/update/update.product.usecase.ts)
    -   [UpdateProductUseCase Integration Spec](/src/usecase/product/update/update.product.integration.spec.ts)
    -   [UpdateProductUseCase Unit Spec](/src/usecase/product/update/update.product.unit.spec.ts)

## Notification Pattern Challenge

-   [Product](/src/domain/product/entity/product.ts)
-   [Product Spec](/src/domain/product/entity/product.spec.ts)
    -   Test: "should throw it, name and price erros"

## Validation Challenge

-   [Product](/src/domain/product/entity/product.ts)
-   [ProductYupValidator](/src/domain/product/validator/product.yup.validator.ts)
-   [ProductValidatorFactory](/src/domain/product/factory/product.validator.factory.ts)
-   Refactor
    -   [Entity](/src/domain/@shared/entity/entity.abstract.ts)
    -   [Customer](/src/domain/customer/entity/customer.ts)
