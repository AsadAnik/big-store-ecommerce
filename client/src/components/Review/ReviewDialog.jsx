import React from 'react';
import "./ReviewDialog.css";
import { Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import Button from '../widgets/Button/Button';

// Review Dialog Component Here..
export default function ReviewDialog({ review, openDialog, setOpenDialog, setReview, handleSubmitReview }) {
    return (
        <>
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Submit Review</DialogTitle>

                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(event) => setReview({ ...review, rating: event.target.value })}
                        value={review.rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30" rows="5"
                        value={review.comment}
                        onChange={(event) => setReview({ ...review, comment: event.target.value })}
                        placeholder="The Product is Awesome"
                    ></textarea>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} title="Cancel" variant="danger" />
                    <Button onClick={() => handleSubmitReview()} title="Submit" variant="agree" />
                </DialogActions>
            </Dialog>
        </>
    )
}
