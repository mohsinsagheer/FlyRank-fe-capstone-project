import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AISearchBar } from '../AISearchBar';

describe('AISearchBar Component', () => {
  it('renders input field and title correctly', () => {
    render(
      <AISearchBar
        query=""
        onQueryChange={() => {}}
        onSearch={() => {}}
        onClear={() => {}}
        isSearching={false}
        requirements={null}
        isActive={false}
        errorMsg={null}
      />
    );

    expect(screen.getByText('AI Shopping Assistant')).toBeInTheDocument();
    expect(screen.getByLabelText('Natural Language AI Search Input')).toBeInTheDocument();
  });

  it('triggers onSearch when form is submitted', () => {
    const handleSearch = vi.fn();
    render(
      <AISearchBar
        query="Gaming laptop"
        onQueryChange={() => {}}
        onSearch={handleSearch}
        onClear={() => {}}
        isSearching={false}
        requirements={null}
        isActive={false}
        errorMsg={null}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Ask AI/i });
    fireEvent.click(submitBtn);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
