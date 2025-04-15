import React, { useState } from 'react';

// Import Components
import ButtonPrimary from '../components/microComponents/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from '../components/microComponents/ButtonSecondary/ButtonSecondary';
import ButtonTertiary from '../components/microComponents/ButtonTertiary/ButtonTertiary';
import InputField from '../components/microComponents/InputField/InputField';
import TextAreaField from '../components/microComponents/TextAreaField/TextAreaField';
import Icon from '../components/microComponents/Icon/Icon';
import NavLink from '../components/microComponents/NavLink/NavLink';
import SidebarLink from '../components/microComponents/SidebarLink/SidebarLink';
import Card from '../components/microComponents/Card/Card';
import DashboardBox from '../components/microComponents/DashboardBox/DashboardBox';
import Avatar from '../components/microComponents/Avatar/Avatar';
import Divider from '../components/microComponents/Divider/Divider';
import Alert from '../components/microComponents/Alert/Alert';
import Modal from '../components/microComponents/Modal/Modal';

import {
    Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
    Paragraph, Caption, Blockquote, Code, Link,
    UnorderedList, OrderedList, ListItem, Label,
    InlineCode, Strong, Emphasis, Mark, InlineSmall, HorizontalRule
} from '../components/microComponents/Typography';

import styles from './StyleGuide.module.css';

const StyleGuide = () => {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(true); // Start visible for demo

    return (
        <div className={styles.container}>
            <Heading1>Component Style Guide</Heading1>

            <HorizontalRule />
            <Heading2>Buttons</Heading2>
            <div className={styles.componentGroup}>
                <ButtonPrimary onClick={() => alert('Primary Clicked')}>Primary Button</ButtonPrimary>
                <ButtonSecondary>Secondary Button</ButtonSecondary>
                <ButtonTertiary>Tertiary Button</ButtonTertiary>
                <ButtonPrimary disabled>Disabled Primary</ButtonPrimary>
                <ButtonSecondary disabled>Disabled Secondary</ButtonSecondary>
                <ButtonTertiary disabled>Disabled Tertiary</ButtonTertiary>
            </div>

            <HorizontalRule />
            <Heading2>Form Fields</Heading2>
            <div className={styles.componentGroupRow}>
                <InputField
                    label="Example Input"
                    id="input-example"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter text here..."
                />
                <InputField
                    label="Input with Error"
                    id="input-error"
                    value="Invalid input"
                    onChange={() => { }}
                    error="This field has an error."
                />
                <InputField
                    label="Disabled Input"
                    id="input-disabled"
                    value="Cannot edit"
                    disabled
                />
            </div>
            <div className={styles.componentGroupRow}>
                <TextAreaField
                    label="Example Text Area"
                    id="textarea-example"
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    placeholder="Enter multiple lines..."
                    rows={4}
                />
                <TextAreaField
                    label="Disabled Text Area"
                    id="textarea-disabled"
                    value="Cannot edit this text area."
                    rows={4}
                    disabled
                />
            </div>

            <HorizontalRule />
            <Heading2>Typography</Heading2>
            <Heading1>Heading 1</Heading1>
            <Heading2>Heading 2</Heading2>
            <Heading3>Heading 3</Heading3>
            <Heading4>Heading 4</Heading4>
            <Heading5>Heading 5</Heading5>
            <Heading6>Heading 6</Heading6>
            <Paragraph>
                This is a standard paragraph containing various inline elements. You can use <Strong>strong text</Strong> for importance,
                or <Emphasis>emphasized text</Emphasis> for stress. Sometimes you might want to <Mark>highlight text</Mark> using the mark component.
                Inline code looks like <InlineCode>const greeting = "hello";</InlineCode>. Links are rendered like <Link href="#">this example link</Link>.
                There's also <InlineSmall>inline small text</InlineSmall> for less prominent details.
            </Paragraph>
            <Blockquote>
                This is a blockquote, often used for highlighting quotations or excerpts. It typically has distinct styling like indentation and a border.
            </Blockquote>
            <Label htmlFor="">Standalone Label Example</Label>
            <UnorderedList>
                <ListItem>Unordered list item 1</ListItem>
                <ListItem>Unordered list item 2</ListItem>
            </UnorderedList>
            <OrderedList>
                <ListItem>Ordered list item 1</ListItem>
                <ListItem>Ordered list item 2</ListItem>
            </OrderedList>
            <Code>{`function example(arg) {
  // This is a code block example
  return arg + 1;
}`}</Code>
            <Caption>This is a caption, often used for figures or images.</Caption>
            <HorizontalRule />

            <HorizontalRule />
            <Heading2>Navigation</Heading2>
            <div className={styles.componentGroup}>
                <NavLink href="#nav1">Nav Link 1</NavLink>
                <NavLink href="#nav2" className={styles.active}>Active Nav Link</NavLink> {/* Manual active for demo */}
            </div>
            <div className={styles.componentGroupColumn} style={{ marginTop: 'var(--space-md)' }}>
                <SidebarLink iconName="FiHome" href="#side1">Sidebar Link 1</SidebarLink>
                <SidebarLink iconName="FiSettings" href="#side2" className={styles.active}>Active Sidebar Link</SidebarLink> {/* Manual active for demo */}
                <SidebarLink iconName="FiLogOut" href="#side3">Logout</SidebarLink>
            </div>

            <HorizontalRule />
            <Heading2>UI Elements</Heading2>
            <div className={styles.componentGroup}>
                <Heading4>Icon</Heading4>
                <Icon name="FiStar" size="2em" color="var(--color-warning)" />
                <Icon name="FiHeart" size="1.5em" />
                <Icon name="FiCoffee" size="1em" />
                <Icon name="FiInvalidName" /> {/* Example of invalid icon */}
            </div>

            <div className={styles.componentGroup}>
                <Heading4>Avatar</Heading4>
                <Avatar src="https://via.placeholder.com/40" alt="User 1" size="md" shape="circle" />
                <Avatar initials="TC" alt="Test Crew" size="md" shape="square" />
                <Avatar initials="BD" alt="Bordered Doe" size="lg" shape="circle" bordered />
                <Avatar size="sm" shape="square" />
            </div>

            <div className={styles.componentGroupColumn}>
                <Heading4>Card & DashboardBox</Heading4>
                <Card>
                    <Paragraph>This is a basic Card component.</Paragraph>
                </Card>
                <DashboardBox title="Dashboard Box Example">
                    <Paragraph>This uses the Card component internally.</Paragraph>
                    <ButtonSecondary>Action</ButtonSecondary>
                </DashboardBox>
            </div>

            <div className={styles.componentGroupColumn}>
                <Heading4>Divider</Heading4>
                <Paragraph>Horizontal divider below:</Paragraph>
                <Divider />
                <Paragraph>Vertical divider in flex context:</Paragraph>
                <div style={{ display: 'flex', height: '50px', alignItems: 'center' }}>
                    <span>Left</span>
                    <Divider orientation="vertical" />
                    <span>Right</span>
                </div>
            </div>

            <HorizontalRule />
            <Heading2>Feedback</Heading2>
            <div className={styles.componentGroupColumn}>
                <Heading4>Alert</Heading4>
                {showAlert && (
                    <Alert type="info" closable onClose={() => setShowAlert(false)}>Informational Alert</Alert>
                )}
                {!showAlert && <ButtonTertiary onClick={() => setShowAlert(true)}>Show Info Alert</ButtonTertiary>}
                <Alert type="success" title="Success!">Action completed successfully.</Alert>
                <Alert type="warning" showIcon={false}>Warning message without icon.</Alert>
                <Alert type="error" title="Operation Failed">Could not process the request.</Alert>
            </div>

            <div className={styles.componentGroupColumn}>
                <Heading4>Modal</Heading4>
                <ButtonPrimary onClick={() => setShowModal(true)}>Open Modal</ButtonPrimary>
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title="Example Modal"
                    footer={
                        <>
                            <ButtonSecondary onClick={() => setShowModal(false)}>Cancel</ButtonSecondary>
                            <ButtonPrimary onClick={() => setShowModal(false)}>Confirm</ButtonPrimary>
                        </>
                    }
                >
                    <Paragraph>This is the content area of the modal dialog.</Paragraph>
                    <Paragraph>It uses the Card component for its structure.</Paragraph>
                </Modal>
            </div>

        </div>
    );
};

export default StyleGuide; 