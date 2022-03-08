import { connect } from "mongoose";

import { DB_URI } from "./dbConstants";

const connectToDb = () => connect(DB_URI);

export default connectToDb;
