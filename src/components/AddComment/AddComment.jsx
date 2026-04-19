import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Typography, Menu } from '@mui/material';

import {
    addComment,
    selectPostIsSuccess, selectPostIsFail, selectPostErrors,
    resetRequestState,
} from '../../redux/slices/postSlice';
import validationRules from '../../helpers/formValidationRules';
import {
    AddCommentPanel,
    SmileButton,
    Smile,
    AddCommentForm,
    Input,
    InputError,
    ResultError,
    SendButton,
} from './AddComment.styled';
import IconSmile from '../../assets/icons/smile.svg';

const smileSymbols = ['🙂', '😁', '👍', '🔥', '🙏', '❤️', '👎', '😢', '😱', '😇', '🤡', '😡', '🤪', '😈', '😎', '😔', '🙄',];

function AddComment({ postId }) {
    const dispatch = useDispatch();
    const isSuccess = useSelector(selectPostIsSuccess);
    const isFail = useSelector(selectPostIsFail);
    const serverAllErrors = useSelector(selectPostErrors);
    const serverFieldErrors = serverAllErrors.filter(err => err.type && err.type === 'field');
    const errorMessage = serverAllErrors.find(err => err.type === undefined)?.msg;

    const [smileAnchorEl, setSmileAnchorEl] = useState(null);
    const isSmileOpen = Boolean(smileAnchorEl);
    const handleSmileClick = e => {
        setSmileAnchorEl(e.currentTarget);
    };
    const insertTextAtCursor = (input, smile) => {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const currentText = input.value;
        input.value = currentText.substring(0, start) + ` ${smile} ` + currentText.substring(end);
        input.selectionStart = input.selectionEnd = start + 3;
        input.focus();
    }
    const handleSmileChoose = ({ target: { innerText: smile } }) => {
        let input = document.getElementById('comment_input_text');
        insertTextAtCursor(input, smile);
        input = undefined;

        setSmileAnchorEl(null);
    };

    const { register, handleSubmit, setError, reset, formState: { isSubmitting, isSubmitted, isSubmitSuccessful, isDirty, errors } } = useForm({
        defaultValues: { text: '' },
    });

    const sendData = data => dispatch(addComment({ postId, ...data }));

    useEffect(() => {
        if (isSubmitted && isSubmitSuccessful && isSuccess) {
            reset();
        }

        if (isFail) {
            serverFieldErrors.forEach(({ path, msg }) => {
                setError(path, { type: 'server', message: msg });
            });
        }

        return () => dispatch(resetRequestState());
    }, [isSubmitted, isSubmitSuccessful, isSuccess, isFail, dispatch, setError]);

    return (
        <AddCommentPanel>
            <SmileButton onClick={handleSmileClick}>
                <img src={IconSmile} alt="Add smile" title="Add smile" />
            </SmileButton>
            <Menu
                id="smiles-menu"
                aria-labelledby="smiles-menu"
                anchorEl={smileAnchorEl}
                open={isSmileOpen}
                onClose={handleSmileChoose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                slotProps={{
                    list: {
                        sx: {
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            maxWidth: '200px',
                        },
                    },
                }}
            >
                {smileSymbols.map((symbol, i) => (
                    <Smile key={`smile_${i}`} onClick={handleSmileChoose}>{symbol}</Smile>
                ))}
            </Menu>
            <AddCommentForm component="form" onSubmit={handleSubmit(sendData)} noValidate>
                <Input
                    id="comment_input_text"
                    disabled={isSubmitting}
                    {...register('text', { ...validationRules.required, ...validationRules.max() })}
                />
                {errors.username && <InputError color="error">{errors.username.message}</InputError>}
                {isFail && !isDirty && errorMessage && <ResultError color="error">{errorMessage}</ResultError>}

                <SendButton type="submit" disabled={isSubmitting}>Send</SendButton>
            </AddCommentForm>
        </AddCommentPanel>
    );
}

export default AddComment;