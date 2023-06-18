import { render, screen } from "tests/test-utils";
import PageContainer from "./PageContainer";

describe("<PageContainer />", () => {
  const pageTitle = "Employees";
  it("should render title and passed in children", () => {
    const childrenLabel = "container-children";
    render(
      <PageContainer title={pageTitle}>
        <div aria-label={childrenLabel}></div>
      </PageContainer>
    );

    expect(screen.getByText(pageTitle)).toBeInTheDocument();
    expect(screen.getByLabelText(childrenLabel)).toBeInTheDocument();
  });

  it("should render passed in button", () => {
    const buttonLabel = "add-btn";
    render(
      <PageContainer
        title={pageTitle}
        button={<button aria-label={buttonLabel}></button>}
      >
        <div></div>
      </PageContainer>
    );

    expect(screen.getByLabelText(buttonLabel)).toBeInTheDocument();
  });
});
