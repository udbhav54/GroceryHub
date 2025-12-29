import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    // connect db
    await connectDb()
    // taking data from fronted
    const {name, email, password} = await req.json()

    // check user exist or not
    const existUser = await User.findOne({email})
    if (existUser) {
      return NextResponse.json(
        {message: "email already exits!"},
        {status: 400}
      )
    }
    // password 6 character
    if(password.length < 6) {
      return NextResponse.json(
        {message: "password must be at least 6 characters"},
        {status: 400}
      )
    }

    // hash password
    const hasedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      name, email, password:hasedPassword
    })

    return NextResponse.json(
      user,
      { status: 200}
    );

  } catch (error) {
    return NextResponse.json({message: `register error ${error}`},
    {status: 500}
    )
  }

}

// connect db
// name, email, password -> frontend
// email check
// password 6 character
// password hash
// user create