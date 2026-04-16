import { DividerStack, DividerLine, DividerText } from './AuthDivider.styled';

function AuthDivider({ ...attributes }) {
    return (
        <DividerStack {...attributes}>
            <DividerText variant="bodyGrey">OR</DividerText>
            <DividerLine />
        </DividerStack>
    );
}

export default AuthDivider;