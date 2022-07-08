import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import FunctionsIcon from '@mui/icons-material/Functions';
import { TileProfile } from '../profile';

export interface PatternEditorProps {
  // colorMap: ColorMap;
  // onColorMapChange: (newColorMap: ColorMap) => void;
}

export const PatternEditor: React.FC<PatternEditorProps> = (
  props: PatternEditorProps
): JSX.Element => {
  return (
    <Card variant="outlined">
      <CardHeader
        sx={{ alignItems: 'center' }}
        title={
          <Stack direction="row" alignContent="center" spacing={1}>
            <FunctionsIcon />
            <Typography>Pattern Editor</Typography>
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <TextField multiline />
        </Stack>
      </CardContent>
    </Card>
  );
};

export {};
