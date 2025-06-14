import Notification from '../notification/notification'
import NotificationError from '../notification/notification.error'
import ValidatorInterface from '../validator/validator.interface'

export default abstract class Entity {
    protected _id: string
    protected _validator: ValidatorInterface<any>
    public notification: Notification

    constructor(
        validator: ValidatorInterface<any>
    ) {
        this.notification = new Notification()
        this._validator = validator
    }

    get id(): string {
        return this._id
    }

    validate() {
        this._validator.validate(this)
    }

    protected validateAndThrowErrorsIfNeeded() {
        this.validate()
        if (this.notification.hasErrors()) {
            throw new NotificationError(
                this.notification.getErrors()
            )
        }
    }
}
