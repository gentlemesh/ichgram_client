import { Page, PageContentWrapper, PageContent, PageTitle, PageText } from './Error404Page.styled';
import bgAuth from '../../../assets/bg-auth.png';

function Error404Page() {

    return (
        <Page>
            <PageContentWrapper>
                <img src={bgAuth} alt="App Visual" />
                <PageContent>
                    <PageTitle variant="h1">Oops! Page Not Found (404 Error)</PageTitle>
                    <PageText>
                        We're sorry, but the page you're looking for doesn't seem to exist.<br />
                        If you typed the URL manually, please double-check the spelling.<br />
                        If you clicked on a link, it may be outdated or broken.
                    </PageText>
                </PageContent>
            </PageContentWrapper>
        </Page>
    );
}

export default Error404Page;