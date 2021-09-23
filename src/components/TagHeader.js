import React from 'react'
import '../stylesheets/TagHeader.css'
import RoundedPill from '../global-components/RoundedPill'

export default function TagHeader() {
    return (
        <div className="post-header">
            <RoundedPill text='All' selected />
            <RoundedPill text='Binary Trees' />
            <RoundedPill text='Cricket' />
            <RoundedPill text='Leetcode' />
            <RoundedPill text='Rohit Sharma' />
            <RoundedPill text='Dynamic programming' />
            <RoundedPill text='Hackerearth' />
            <RoundedPill text='Javascript' />
            <RoundedPill text='Reactjs' />
            <RoundedPill text='Virat kohli' />
            <RoundedPill text='Courses' />
            <RoundedPill text='Programming' />
            <RoundedPill text='GeeksforGeeks' />
            <RoundedPill text='Arrays' />
            <RoundedPill text='Python' />
            <RoundedPill text='Sachin Tendulkar' />
        </div>
    )
}
