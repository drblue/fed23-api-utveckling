import { model, Schema, Document } from "mongoose";

export interface PersonDocument extends Document {
	name: string
}

const PersonSchema: Schema = new Schema<PersonDocument>({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
	}
});

export const Person = model<PersonDocument>("Person", PersonSchema);
