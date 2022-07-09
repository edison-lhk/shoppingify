import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type UserType = {
    username: string,
    email: string,
    password: string,
    items?: Array<string> | [],
    createdAt: Date,
    validatePassword: (password: string) => Promise<boolean>,
};

const UserSchema = new mongoose.Schema<UserType>({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        select: false,
        required: [true, 'Please provide a password'],
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
        default: [],
        ref: 'Item',
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: [true, 'Please provide a date']
    }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    if (this.password) {

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(this.password, salt, (err, hashedPassword) => {
                if (err) return next(err);

                this.password = hashedPassword;
                next();
            });
        });
    }
});

UserSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password as string);
};

const User = mongoose.model<UserType>('User', UserSchema);

export default User;