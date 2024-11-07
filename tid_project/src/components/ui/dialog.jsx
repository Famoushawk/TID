import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import styled from 'styled-components'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`

const DialogOverlay = React.forwardRef((props, ref) => (
  <StyledOverlay ref={ref} {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const StyledContent = styled(DialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const StyledCloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  right: ${({ theme }) => theme.spacing[4]};
  top: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
  
  &:focus {
    outline: none;
  }
`

const StyledCloseIcon = styled(X)`
  height: 1rem;
  width: 1rem;
`

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const DialogContent = React.forwardRef(({ children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <StyledContent ref={ref} {...props}>
      {children}
      <StyledCloseButton>
        <StyledCloseIcon />
        <VisuallyHidden>Close</VisuallyHidden>
      </StyledCloseButton>
    </StyledContent>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1.5]};
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`
DialogHeader.displayName = "DialogHeader"

const DialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`
DialogFooter.displayName = "DialogFooter"

const DialogTitle = styled(DialogPrimitive.Title)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
`
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = styled(DialogPrimitive.Description)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray500};
`
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}