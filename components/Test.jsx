"use client"
import { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu';

export default function Test() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="primary">Open Menu</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {/* First Level */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Level 1 Option 1
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {/* Second Level */}
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Level 2 Option 1
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    {/* Third Level */}
                                    <DropdownMenuItem onClick={() => handleOptionSelect('Option 3.1')}>
                                        Level 3 Option 1
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleOptionSelect('Option 3.2')}>
                                        Level 3 Option 2
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Level 2 Option 2
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    {/* Another set of Third Level */}
                                    <DropdownMenuItem onClick={() => handleOptionSelect('Option 3.3')}>
                                        Level 3 Option 3
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleOptionSelect('Option 3.4')}>
                                        Level 3 Option 4
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Another First Level Option */}
                    <DropdownMenuItem onClick={() => handleOptionSelect('Option 1.2')}>
                        Level 1 Option 2
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Show selected option */}
            {selectedOption && (
                <p className="mt-4">Selected Option: {selectedOption}</p>
            )}
        </div>
    );
}
