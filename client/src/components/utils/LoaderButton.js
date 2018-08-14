import React from "react";
import { Glyphicon } from "react-bootstrap";

export default ({
    isLoading,
    text,
    loadingText,
    disabled = false,
    ...props
}) =>
    <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={disabled || isLoading}>
    {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
    </button>;